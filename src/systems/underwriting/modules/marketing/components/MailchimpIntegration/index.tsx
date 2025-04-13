import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MailchimpIntegrationProps {
  isLoading?: boolean;
}

const MailchimpIntegration: React.FC<MailchimpIntegrationProps> = ({ isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading Mailchimp integration...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mailchimp Integration</CardTitle>
          <CardDescription>Connect and manage your Mailchimp account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Mailchimp Integration component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MailchimpIntegration;
