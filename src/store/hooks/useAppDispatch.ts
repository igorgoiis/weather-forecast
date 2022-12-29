import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/interfaces/redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
