import { ProfileContent } from '../../components/Profile';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export const Profile = () => {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
};
