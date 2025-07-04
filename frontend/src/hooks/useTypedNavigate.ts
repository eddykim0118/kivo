import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../types/routes';

type RouteParams = {
  [ROUTES.HOME]: undefined;
  [ROUTES.UPLOAD]: undefined;
  [ROUTES.MODEL_CONFIG]: undefined;
  [ROUTES.RESULTS]: undefined;
  [ROUTES.DASHBOARD]: undefined;
};

type RouteKey = keyof RouteParams;

export function useTypedNavigate() {
  const navigate = useNavigate();

  const typedNavigate = useCallback(
    <T extends RouteKey>(route: T, params?: RouteParams[T]) => {
      navigate(route);
    },
    [navigate]
  );

  return typedNavigate;
} 