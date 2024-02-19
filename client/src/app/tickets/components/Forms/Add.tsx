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
import { Box } from '@mui/material';

const schema = yup.object().shape({
  description: yup.string().required('Description is required'),
});

const TicketForm: React.FC<{ onSubmit: SubmitHandler<FormData> }> = ({
  onSubmit,
}) => {
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
    formState: { errors },
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
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};

export default TicketForm;
