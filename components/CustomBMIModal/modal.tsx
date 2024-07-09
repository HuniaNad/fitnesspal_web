import React from 'react'
import { Modal } from 'antd';
import './modal.css';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { colors } from '@/public/colors/colors';

const CustomBMIModal = ({modalState, setModalState}: {modalState: boolean, setModalState: (state: boolean) => void}) => {

    const modalStyles = {
        header: {
            paddingTop: 30,
            textAlign: 'center',
        },
        body: {
            padding: '40px'
        },
    };
  
    return (
    <>
      <Modal
        title="BMI Analysis"
        centered
        open={modalState}
        onCancel={() => setModalState(!modalState)} 
        onOk={() => setModalState(!modalState)}
        footer={null}
        width={'800px'}
        styles={modalStyles}
        className='bmi-modal'
        closeIcon={
            <CancelRoundedIcon 
                style={{
                    fontSize: '30px',
                    color: colors.purple,
                }}
            />
        }
      >
        <div className="row flex justify-between">
          <div className="col">
            <p>Healthy BMI Range</p>
          </div>

          <div className="col">
            <p className='font-bold'>18.5 kg/m<sup>2</sup> - 24.9 kg/m<sup>2</sup></p>
          </div>
        </div>
        <div className="row flex justify-between">
          <div className="col">
            <p>Healthy Weight for Height</p>
          </div>

          <div className="col">
            <p className='font-bold'>47.4 kg - 64 kg</p>
          </div>
        </div>

        <div className="bmi-note text-center">
          <h1>Important Note:</h1>
          <p>BMI is a screening tool. Consult a healthcare professional for personalized advice.</p>
        </div>
      </Modal>
    </>
  );

}

export default CustomBMIModal