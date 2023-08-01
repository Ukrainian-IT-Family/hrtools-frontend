import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixLoader, Loader, MyModal } from 'src/components';
import { vacationsActions } from 'src/store/actions';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import * as S from './styles';

const DeleteVac = ({ handleClose, handleOpen, deleteId }) => {
  const fixWaiter = useSelector((state) => state.vacationsReducer.fixWaiter);
  const [formSubmit, setFormSubmit] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(vacationsActions.myVacationDelete(deleteId));
    dispatch(vacationsActions.myVacation(1));
    setFormSubmit(true);
  };

  return (
    <>
      {fixWaiter && <FixLoader />}
      <form onSubmit={handleSubmit} id="form">
        {formSubmit ? (
          <>
            <S.ModalTitle>Запит видаленно!</S.ModalTitle>
            <Stack mt={2} mb={3} justifyContent="center" direction="row" spacing={2}>
              <Button variant="contained" onClick={handleClose}>
                Ок
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <S.ModalTitle>Delete запит ?</S.ModalTitle>
            <Stack mt={2} mb={3} justifyContent="center" direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                Так
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Ні
              </Button>
            </Stack>
          </>
        )}
      </form>
    </>
  );
};

DeleteVac.propTypes = {
  deleteId: PropTypes.number.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default DeleteVac;
