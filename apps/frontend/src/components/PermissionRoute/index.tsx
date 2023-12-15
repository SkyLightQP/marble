import React from 'react';
import { useUser } from '../../hooks/useUser';

interface PermissionRouteProps {
  success: React.ReactNode;
  failure: React.ReactNode;
}

export const PermissionRoute: React.FC<PermissionRouteProps> = ({ success: Success, failure: Failure }) => {
  const user = useUser();

  if (user === undefined) {
    return Success;
  }

  return Failure;
};
