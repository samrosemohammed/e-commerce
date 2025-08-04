import { ReactNode } from "react";
import { Card, CardContent } from "./ui/card";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  title = "No data found",
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) => {
  return (
    <Card
      className={`min-h-[70vh] flex items-center justify-center flex-col text-center py-8 ${className}`}
    >
      <CardContent>
        {icon && <div className="mb-4 flex justify-center">{icon}</div>}
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}
        {action && <div>{action}</div>}
      </CardContent>
    </Card>
  );
};
