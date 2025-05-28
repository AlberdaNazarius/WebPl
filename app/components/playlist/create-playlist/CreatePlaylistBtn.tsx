import React, { FC, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PlaylistService } from '@/app/services/playlist.service';

const CreatePlaylistBtn: FC = ({}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = () => {
    dialogRef?.current?.showModal();
  };

  const initialValues = {
    name: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Playlist name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name cannot exceed 50 characters'),
  });

  const handleSubmit = async (values: { name: string }) => {
    await PlaylistService.createPlaylist({ name: values.name, imageKey: 'image-asset.png' });
    dialogRef?.current?.close();
  };

  return (
    <>
      <button onClick={openDialog} className="absolute text-2xl top-0 right-3 hover:text-white cursor-pointer">+</button>
      <dialog ref={dialogRef} className="modal">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className='modal-box min-w-56'>
              <div className="flex flex-col justify-between">
                <h3 className="font-bold mb-4">Add your playlist</h3>
                <Field
                  name="name"
                  className="input input-bordered w-full text-base mt-auto !py-2"
                  type="text"
                  placeholder="Name"
                  aria-label="Name your playlist"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                <button type="submit" className="btn btn-outline mt-4">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default CreatePlaylistBtn;