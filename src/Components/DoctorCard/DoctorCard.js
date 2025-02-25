import { useEffect, useState } from 'react';
import './DoctorCard.css';
import { Link, useSearchParams } from 'react-router-dom';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import 'reactjs-popup/dist/index.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Alert, Snackbar } from '@mui/material';

function DoctorCard({ name, speciality, experience, ratings }) {
  // const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [successBooking, setSuccessBooking] = useState({
    open: false,
    data: null,
  });
  // const [searchParams] = useSearchParams();
  // const [filteredDoctors, setFilteredDoctors] = useState(false);
  // const [isSearched, setIsSearched] = useState(false);

  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // const handleShowAppointmentForm = () => {
  //   setShowAppointmentForm(true);
  // };

  const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
  if (!storedDoctorData || !Array.isArray(storedDoctorData)) {
    return (
      <div>
        <h1>No doctor data found</h1>
      </div>
    );
  }

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    setAppointments(updatedAppointments);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };

    console.log(newAppointment);
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);
    setSuccessBooking({
      open: true,
      data: newAppointment,
    });
  };

  return (
    <div>
      <div className="searchpage-container" style={{ marginTop: '50px' }}>
        <div className="search-results-container">
          <div className="doctor-card-container">
            <div className="doctor-card-details-container">
              <div className="doctor-card-details">
                <img
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                  alt=""
                />
                <div className="doctor-card-detail-name">{name}</div>
                <div className="doctor-card-detail-speciality">
                  {speciality}
                </div>
                <div className="doctor-card-detail-experience">
                  {experience} years experience
                </div>
                <div className="doctor-card-detail-consultationfees">
                  Ratings: {ratings}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="doctor-card-options-container">
          <Popup
            style={{ backgroundColor: '#FFFFFF' }}
            trigger={
              <div style={{ height: '50%', width: '60%' }}>
                <button
                  className={`book-appointment-btn ${
                    appointments.length > 0 ? 'cancel-appointment' : ''
                  }`}
                >
                  {appointments.length > 0 ? (
                    <div>Cancel Appointment</div>
                  ) : (
                    <div>Book Appointment</div>
                  )}
                  <div>No Booking Fee</div>
                </button>
              </div>
            }
            modal
            open={showModal}
            onClose={() => setShowModal(false)}
          >
            {(close) => (
              <div className="doctorbg" style={{ height: '80vh' }}>
                <div>
                  <div className="doctor-card-profile-image-container">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg> */}
                    {/* <img src={defaultImage} alt="Placeholder" className="doctor-profile-image-placeholder" /> */}
                    <img
                      src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                      alt=""
                    />
                  </div>
                  <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">
                      {speciality}
                    </div>
                    <div className="doctor-card-detail-experience">
                      {experience} years experience
                    </div>
                    <div className="doctor-card-detail-consultationfees">
                      Ratings: {ratings}
                    </div>
                  </div>
                </div>

                {appointments.length > 0 ? (
                  <>
                    <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>

                    {appointments.map((appointment) => (
                      <div className="bookedInfo" key={appointment.id}>
                        <Card
                          style={{
                            marginTop: '70px',
                            marginLeft: '140px',
                            width: '450px',
                          }}
                        >
                          <CardContent>
                            <Typography variant="h5" gutterBottom>
                              Name: {appointment.name}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                              Phone Number: +{appointment.phoneNumber}
                            </Typography>
                            <Button
                              onClick={() => handleCancel(appointment.id)}
                              variant="contained"
                              color="error"
                              style={{ width: '60%', marginLeft: '100px' }}
                            >
                              Cancel Appointment
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </>
                ) : (
                  <AppointmentForm
                    doctorName={name}
                    doctorSpeciality={speciality}
                    onSubmit={handleFormSubmit}
                  />
                )}
              </div>
            )}
          </Popup>
        </div>
      </div>
      <Snackbar
        open={successBooking.open}
        autoHideDuration={60000}
        onClose={() =>
          setSuccessBooking({
            open: false,
            data: null,
          })
        }
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert
          onClose={() =>
            setSuccessBooking({
              open: false,
              data: null,
            })
          }
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successBooking.open && (
            <div>
              <h4>Appointment Details</h4>
              <div>
                <strong>Doctor: </strong> {successBooking.data?.doctorName}
              </div>
              <div>
                <strong>Specialty: </strong>{' '}
                {successBooking.data?.doctorSpeciality}
              </div>
              <div>
                <strong>Name: </strong> {successBooking.data?.name}
              </div>
              <div>
                <strong>Phone Number: </strong>{' '}
                {successBooking.data?.phoneNumber}
              </div>
              <div>
                <strong>Date of Appointment: </strong>{' '}
                {new Date(successBooking.data?.selectedDate).toDateString()}
              </div>
              <div>
                <strong>Time Slot: </strong> {successBooking?.data.selectedSlot}
              </div>
            </div>
          )}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DoctorCard;
