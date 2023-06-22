import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createRestaurantTable } from 'apiSdk/restaurant-tables';
import { Error } from 'components/error';
import { restaurantTableValidationSchema } from 'validationSchema/restaurant-tables';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RestaurantInterface } from 'interfaces/restaurant';
import { TableStatusInterface } from 'interfaces/table-status';
import { getRestaurants } from 'apiSdk/restaurants';
import { getTableStatuses } from 'apiSdk/table-statuses';
import { RestaurantTableInterface } from 'interfaces/restaurant-table';

function RestaurantTableCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RestaurantTableInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRestaurantTable(values);
      resetForm();
      router.push('/restaurant-tables');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RestaurantTableInterface>({
    initialValues: {
      restaurant_id: (router.query.restaurant_id as string) ?? null,
      table_status_id: (router.query.table_status_id as string) ?? null,
    },
    validationSchema: restaurantTableValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Restaurant Table
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Select Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<TableStatusInterface>
            formik={formik}
            name={'table_status_id'}
            label={'Select Table Status'}
            placeholder={'Select Table Status'}
            fetcher={getTableStatuses}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.status}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'restaurant_table',
  operation: AccessOperationEnum.CREATE,
})(RestaurantTableCreatePage);
