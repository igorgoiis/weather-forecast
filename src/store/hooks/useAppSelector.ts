import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'src/interfaces/redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
