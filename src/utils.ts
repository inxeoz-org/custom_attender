export function badgeClass(workflowState: string) {
  switch (workflowState) {
    case "Approved":
      return "green";
    case "Pending":
      return "orange";
    case "Draft":
      return "gray";
    default:
      return "gray";
  }
}
