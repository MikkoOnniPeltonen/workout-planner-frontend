

function Modal({ isOpen, closeModal, videoUrl, exerciseName }) {
    
    if(!isOpen) return null
  
    return (
    <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{exerciseName}</h2>
            <iframe 
                width='100%' 
                height='315' 
                src={videoUrl}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
            ></iframe>
            <button onClick={closeModal}></button>
        </div>
      
    </div>
  )
}

export default Modal
