import { theme } from "@/ui-library";

export const styles: { [key: string]: React.CSSProperties } = {
  pageButton: {
    backgroundColor: theme.colors.red,
    color: theme.colors.light,
    borderRadius: "5px",
    padding: "3px 8px",
    fontWeight: "600",
  },
  activePageButton: {
    backgroundColor: theme.colors.dark,
    color: theme.colors.light,
    borderRadius: "5px",
    padding: "3px 8px",
    fontWeight: "600",
  },
};
