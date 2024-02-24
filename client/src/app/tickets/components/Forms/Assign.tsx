import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { FormDataAssign } from '../../../../constants/type.common';
import { RootState } from '../../../../store/store';
import stylesGlobal from '../../../app.module.css';

const schema = yup.object().shape({
  assigneeId: yup.number().required().notRequired(),
});

interface TicketAssignProps {
  onSubmit: SubmitHandler<FormDataAssign>;
  assignName: string;
}

const TicketAssign: React.FC<TicketAssignProps> = ({
  onSubmit,
  assignName,
}) => {
  const { loadingAssign } = useSelector((state: RootState) => state.tickets);
  const { users } = useSelector((state: RootState) => state.users);

  const { handleSubmit, setValue, control } = useForm<FormDataAssign>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={1}>
        <Controller
          render={({ field }) => {
            return (
              <Autocomplete
                options={users}
                getOptionLabel={(option) => option.name}
                defaultValue={{ name: assignName, id: 1 }}
                sx={{
                  '& .MuiFormControl-root': {
                    '& .MuiInputBase-root': {
                      height: 40,
                      '& input': {
                        height: 0,
                      },
                    },
                  },
                }}
                onChange={(_, selectedOption) => {
                  setValue('assigneeId', selectedOption?.id || null);
                }}
                autoHighlight
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      sx={{ fontSize: 14 }}
                      variant="outlined"
                      // label={assignName}
                      // value={'cc'}
                    />
                  );
                }}
              />
            );
          }}
          name="assigneeId"
          control={control}
        />
      </Box>
      <Box className={stylesGlobal['buttons']}>
        <Button
          type="submit"
          variant="contained"
          className={stylesGlobal['btn-primary']}
          disabled={loadingAssign}
        >
          Assign
          {loadingAssign && (
            <Box ml={1} display="flex">
              <CircularProgress size={20} />
            </Box>
          )}
        </Button>
      </Box>
    </form>
  );
};

export default TicketAssign;
