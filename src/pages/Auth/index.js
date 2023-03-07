export const Auth = isSignupPage => (
  <>
    {isSignupPage ? (
      <Auth title='Добро пожаловать!' isSignupPage />
    ) : (
      <Auth title='Рады видеть!' />
    )}
  </>
);
