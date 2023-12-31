import { useUser } from '@/hooks/useUser';

interface PermissionRouteProps {
  success: JSX.Element;
  failure: JSX.Element;
}

export const PermissionRoute = ({ success: Success, failure: Failure }: PermissionRouteProps) => {
  const user = useUser();

  if (user === undefined) {
    return Failure;
  }

  return Success;
};
