import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { toggleDetails } from '../../store';

export function useOutsideAlerter(ref) {
  const dispatch = useDispatch();
    useEffect(() => {

      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(toggleDetails(false));
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }