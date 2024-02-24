import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { RootState } from '../../../../store/store';
import { FormData } from '../../../../constants/type.common';
import { Box, CircularProgress } from '@mui/material';
import stylesGlobal from '../../../app.module.css';

const schema = yup.object().shape({
  description: yup.string().required('Description is required'),
});

const TicketForm: React.FC<{ onSubmit: SubmitHandler<FormData> }> = ({
  onSubmit,
}) => {
  const { loading } = useSelector((state: RootState) => state.tickets);
  const { users } = useSelector((state: RootState) => state.users);
  const [selectedUser, setSelectedUser] = useState<number | 'default'>(
    'default'
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedUser>) => {
    setSelectedUser(event.target.value as number | 'default');
  };

  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data: FormData) => {
    if (selectedUser !== 'default') {
      onSubmit(data);
    } else {
      const { assigneeId, ...formDataWithoutAssignee } = data;
      onSubmit(formDataWithoutAssignee);
    }
  };

  const styledField = { marginBottom: '20px' };

  console.log('loading', loading);
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Box style={styledField}>
        <TextField
          label="Description"
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register('description')}
          fullWidth
        />
      </Box>
      <Box style={styledField}>
        <Select
          label="Assignee"
          {...register('assigneeId')}
          fullWidth
          value={selectedUser}
          onChange={handleChange}
        >
          <MenuItem value="default">Choose user</MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box className={stylesGlobal['buttons']}>
        <Button
          type="submit"
          variant="contained"
          className={stylesGlobal['btn-primary']}
          disabled={loading}
        >
          Add
          {loading && (
            <Box ml={1} display="flex">
              <CircularProgress size={20} />
            </Box>
          )}
        </Button>
      </Box>
    </form>
  );
};

export default TicketForm;
