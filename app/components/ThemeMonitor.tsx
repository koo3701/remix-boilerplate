export default function ThemeMonitor() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
            const allCookies = (document.cookie || "").split(";");
            const themeCookie = allCookies.find((cookie) => cookie.trim().startsWith("theme="));
            if (!themeCookie && navigator.cookieEnabled) {
              const themeDetected = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
              document.cookie = 'theme=' + JSON.stringify({ detected: themeDetected, selected: "" }) + ';path=/';
              window.location.reload();
            }
			`,
      }}
    />
  );
}
