export function LinkButton({ href, children }) {
  return (
    <a
      href={href}
      // ToDo: Cleanup styles mixed between classnames and properties
      style={{ display: "inline-block", textDecoration: "none", padding: "0.5rem 3rem" }}
      className="nx-text-current nx-rounded-lg nx-border nx-border-gray-200 dark:nx-shadow-none hover:nx-shadow-gray-100 dark:hover:nx-shadow-none nx-shadow-gray-100 active:nx-shadow-sm active:nx-shadow-gray-200 nx-transition-all nx-duration-200 hover:nx-border-gray-300 nx-bg-transparent nx-shadow-sm dark:nx-border-neutral-800 hover:nx-bg-slate-50 hover:nx-shadow-md dark:hover:nx-border-neutral-700 dark:hover:nx-bg-neutral-900"
    >
      {children}
    </a>
  );
}
