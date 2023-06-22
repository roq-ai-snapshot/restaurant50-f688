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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getRestaurantTableById, updateRestaurantTableById } from 'apiSdk/restaurant-tables';
import { Error } from 'components/error';
import { restaurantTableValidationSchema } from 'validationSchema/restaurant-tables';
import { RestaurantTableInterface } from 'interfaces/restaurant-table';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RestaurantInterface } from 'interfaces/restaurant';
import { TableStatusInterface } from 'interfaces/table-status';
import { getRestaurants } from 'apiSdk/restaurants';
import { getTableStatuses } from 'apiSdk/table-statuses';

function RestaurantTableEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<RestaurantTableInterface>(
    () => (id ? `/restaurant-tables/${id}` : null),
    () => getRestaurantTableById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: RestaurantTableInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateRestaurantTableById(id, values);
      mutate(updated);
      resetForm();
      router.push('/restaurant-tables');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<RestaurantTableInterface>({
    initialValues: data,
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
            Edit Restaurant Table
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'restaurant_table',
  operation: AccessOperationEnum.UPDATE,
})(RestaurantTableEditPage);
