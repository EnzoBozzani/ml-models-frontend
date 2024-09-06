import { useContext } from 'react';
import { ThemePreferenceContext } from '@/components/ThemePreference/ThemePreference';

export function useThemePreference() {
	return useContext(ThemePreferenceContext)!;
}
