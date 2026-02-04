export interface SummaryListItem {
  label: string;
  value: string | string[];
}

export interface SummaryListProps {
  items: SummaryListItem[];
  chipifyArrays?: boolean;
}

