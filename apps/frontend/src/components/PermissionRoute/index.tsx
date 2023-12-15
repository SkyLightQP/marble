import React from 'react';
import { useUser } from '../../hooks/useUser';

interface PermissionRouteProps {
  success: React.ReactNode;
  failure: React.ReactNode;
}

export const PermissionRoute = ({ success: Success, failure: Failure }: PermissionRouteProps) => {
  const user = useUser();

  if (user === undefined) {
    return Failure;
  }

  return Success;
};
