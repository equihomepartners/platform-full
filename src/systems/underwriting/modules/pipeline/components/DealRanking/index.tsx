import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Deal, DealRankingResult } from '../../types';
import { formatCurrency } from '../../../../utils';

interface DealRankingProps {
  deals: Deal[];
  isLoading: boolean;
}

const DealRanking: React.FC<DealRankingProps> = ({ deals, isLoading }) => {
  const [rankedDeals, setRankedDeals] = useState<DealRankingResult[]>([]);
  const [isRanking, setIsRanking] = useState(false);

  // Mock ranking criteria
  const rankingCriteria = [
    { id: '1', name: 'Traffic Light Zone', weight: 0.3, source: 'tfs' as const },
    { id: '2', name: 'LTV Ratio', weight: 0.2, source: 'manual' as const },
    { id: '3', name: 'Property Value', weight: 0.15, source: 'manual' as const },
    { id: '4', name: 'Borrower Income', weight: 0.15, source: 'manual' as const },
    { id: '5', name: 'Portfolio Fit', weight: 0.2, source: 'pms' as const }
  ];

  // Mock function to rank deals
  const rankDeals = async () => {
    setIsRanking(true);
    
    try {
      // In production, this would be an API call
      // const response = await fetch('/api/underwriting/pipeline/rankings/calculate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ dealIds: deals.map(deal => deal.id) })
      // });
      // const data = await response.json();
      // setRankedDeals(data.rankings);
      
      // For now, we'll use mock data
      const mockRankings: DealRankingResult[] = deals.map((deal, index) => {
        // Generate random scores for each criterion
        const criteria = rankingCriteria.map(criterion => {
          let score = 0;
          
          // Simulate scores based on deal properties
          if (criterion.name === 'Traffic Light Zone') {
            score = deal.property.suburb === 'Mosman' || deal.property.suburb === 'Double Bay' ? 0.9 : 0.7;
          } else if (criterion.name === 'LTV Ratio') {
            const ltv = (deal.loan.amount / deal.property.currentValue) * 100;
            score = ltv < 50 ? 0.9 : ltv < 70 ? 0.7 : 0.5;
          } else if (criterion.name === 'Property Value') {
            score = deal.property.currentValue > 2000000 ? 0.8 : 0.6;
          } else if (criterion.name === 'Borrower Income') {
            score = deal.borrower.annualIncome > 150000 ? 0.85 : 0.65;
          } else if (criterion.name === 'Portfolio Fit') {
            score = Math.random() * 0.5 + 0.5; // Random score between 0.5 and 1.0
          }
          
          return {
            name: criterion.name,
            weight: criterion.weight,
            score
          };
        });
        
        // Calculate overall score
        const overallScore = criteria.reduce((sum, criterion) => sum + criterion.score * criterion.weight, 0);
        
        return {
          dealId: deal.id,
          score: overallScore,
          rank: 0, // Will be set after sorting
          criteria
        };
      });
      
      // Sort by score (descending) and assign ranks
      mockRankings.sort((a, b) => b.score - a.score);
      mockRankings.forEach((ranking, index) => {
        ranking.rank = index + 1;
      });
      
      setRankedDeals(mockRankings);
    } catch (error) {
      console.error('Error ranking deals:', error);
    } finally {
      setIsRanking(false);
    }
  };

  // Rank deals on component mount
  useEffect(() => {
    rankDeals();
  }, [deals]);

  // Get deal by ID
  const getDealById = (dealId: string) => {
    return deals.find(deal => deal.id === dealId);
  };

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading || isRanking) {
    return <div className="flex justify-center items-center h-64">Loading rankings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Deal Rankings</h2>
        <Button onClick={rankDeals}>Recalculate Rankings</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {rankingCriteria.map((criterion) => (
          <Card key={criterion.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{criterion.name}</CardTitle>
              <CardDescription>
                Weight: {(criterion.weight * 100).toFixed(0)}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">
                Source: {criterion.source === 'tfs' ? 'Traffic Light System' : 
                         criterion.source === 'pms' ? 'Portfolio Management System' : 'Manual'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {rankedDeals.length === 0 ? (
        <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
          <p className="text-gray-500">No ranked deals available.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Borrower</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Loan Amount</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankedDeals.map((ranking) => {
                const deal = getDealById(ranking.dealId);
                if (!deal) return null;
                
                return (
                  <TableRow key={ranking.dealId}>
                    <TableCell className="font-medium">{ranking.rank}</TableCell>
                    <TableCell>{deal.borrower.name}</TableCell>
                    <TableCell>
                      <div>{deal.property.address}</div>
                      <div className="text-sm text-gray-500">{deal.property.suburb}, {deal.property.state} {deal.property.postcode}</div>
                    </TableCell>
                    <TableCell>{formatCurrency(deal.loan.amount)}</TableCell>
                    <TableCell>
                      <span className={getScoreColor(ranking.score)}>
                        {(ranking.score * 100).toFixed(0)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DealRanking;
