'use client';
// Import necessary dependencies
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
// import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';

// Define the RegisterModal component
function RegisterModal() {
  // Custom hook to manage the register modal state
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the useForm hook to manage the form state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // Send a POST request to the '/api/register' endpoint using axios
    axios
      .post('/api/register', data)
      .then(() => {
        // Display success message
        toast.success('Registered!');
        // Close the register modal
        registerModal.onClose();
      })
      .catch((error) => {
        // Display error message if the request fails
        toast.error(error);
      })
      .finally(() => {
        // Set loading state to false regardless of success or failure
        setIsLoading(false);
      });
  };

  // Callback function to handle toggling the register modal
  const onToggle = useCallback(() => {
    registerModal.onClose();
  }, [registerModal]);

  return (
    // Render the Modal component with the appropriate props
    <Modal
      disabled={isLoading} // Disable the modal if the form is currently submitting
      isOpen={registerModal.isOpen} // Specify if the modal should be open or closed
      title="Register" // Modal title
      actionLabel="Continue" // Label for the submit button
      onClose={registerModal.onClose} // Function to close the modal
      onSubmit={handleSubmit(onSubmit)} // Function to handle form submission
    />
  );
}

export default RegisterModal;
