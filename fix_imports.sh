#!/bin/bash

# Fix imports for services
find src/systems/traffic-light/components -type f -name "*.tsx" -o -name "*.js" | xargs sed -i '' 's|from '\''../../services/mlAnalytics'\''|from '\''../services/mlAnalytics'\''|g'
find src/systems/traffic-light/components -type f -name "*.tsx" -o -name "*.js" | xargs sed -i '' 's|from '\''../../services/openai'\''|from '\''../../../shared/services/openai'\''|g'

# Fix imports for utils
find src/systems/traffic-light/components -type f -name "*.tsx" -o -name "*.js" | xargs sed -i '' 's|from '\''../../utils/formatters'\''|from '\''../../../shared/utils/formatters'\''|g'

# Fix imports for data
find src/systems/traffic-light/components -type f -name "*.tsx" -o -name "*.js" | xargs sed -i '' 's|from '\''../../data/trafficLightZones'\''|from '\''../../../data/trafficLightZones'\''|g'
find src/systems/traffic-light/components -type f -name "*.tsx" -o -name "*.js" | xargs sed -i '' 's|from '\''../../data/sydneySuburbsData'\''|from '\''../../../data/sydneySuburbsData'\''|g'
find src/systems/traffic-light/components -type f -name "*.tsx" -o -name "*.js" | xargs sed -i '' 's|from '\''../../data/sampleDeals'\''|from '\''../../../data/sampleDeals'\''|g'
find src/systems/traffic-light/components -type f -name "*.tsx" -o -name "*.js" | xargs sed -i '' 's|from '\''../../data/sydneyZones'\''|from '\''../../../data/sydneyZones'\''|g'

# Fix imports for portfolio system
find src/systems/portfolio/components -type f -name "*.tsx" -o -name "*.js" | xargs sed -i '' 's|from '\''../../data/pipelineData'\''|from '\''../../../data/pipelineData'\''|g'
find src/systems/portfolio/components -type f -name "*.tsx" -o -name "*.js" | xargs sed -i '' 's|from '\''../../data/sampleDeals'\''|from '\''../../../data/sampleDeals'\''|g'

# Fix imports for underwriting system
find src/systems/underwriting/components -type f -name "*.tsx" -o -name "*.js" | xargs sed -i '' 's|from '\''../../data/sampleDeals'\''|from '\''../../../data/sampleDeals'\''|g'

echo "Import paths fixed!"
