/**
 * Dashboard layout — overrides the root layout's flex-col body
 * so the full-height sidebar app-shell works correctly.
 * ClerkProvider is inherited from the root layout.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
