const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" });

/** A date from the API in words, for example "10 November 2026". */
export const formatDate = (isoDate: string): string =>
  DATE_FORMAT.format(new Date(isoDate));
