import { Card, SimpleGrid, Text } from '@chakra-ui/react';
import MenuMiniStatistics from './MenuMiniStatistics';
import { statsData } from '../dtos/statsData';
// import MenuMiniStatistics from '../../components/MenuMiniStatistics';
// import { statisticsData } from '../data';

interface StatisticsSectionProps {
  bg: string;
  cardShadow: string;
  textColorSecondary: string;
  dashboardData: any;
}

export default function StatisticsSection({ bg, cardShadow, textColorSecondary, dashboardData }: StatisticsSectionProps) {
  return (
    <Card boxShadow={cardShadow} my={3} p={5} w="full" borderRadius={10} bg={bg}>
      <Text color={textColorSecondary} fontSize="md" mb={4}>
        Informações sobre os alunos
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} spacing={4}>
        {statsData(dashboardData).map((data) => (
          <MenuMiniStatistics key={data.name} {...data} />
        ))}
      </SimpleGrid>
    </Card>
  );
}