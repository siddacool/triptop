function createStatisticsStore() {
  let statsSelectedDate: string | undefined = $state(undefined);

  return {
    get statsSelectedDate() {
      return statsSelectedDate;
    },
    async updateStatsSelectedDate(date: string | undefined) {
      statsSelectedDate = date;
      return Promise.resolve();
    },
  };
}

export const useStatisticsStore = createStatisticsStore();
