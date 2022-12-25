import { useEffect, useState } from 'react';
import axios from 'axios';

import { Meme, ModalState } from './types/types';
import Modal from './components/Modal';

import './App.css';


function App() {
  const [memes, setMemes] = useState<Meme[] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentModal, setCurrentModal] = useState<ModalState>({
    id: '',
    name: '',
    blank: '',
    lines: 1,
  })

  const fetchData = async () => {
    try {
      const { data } = await axios.get('https://api.memegen.link/templates')
      setMemes(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()

  }, [])

  const handleOpenModal = ({ id, name, blank, lines }: ModalState) => {
    setCurrentModal({ id, name, blank, lines })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setCurrentModal({ id: '', name: '', blank: '', lines: 1 })
    setIsModalOpen(false)
  }

  return (
    <div className="App">
      <header>
        <h1 className="primary-gradient">Meme Generator</h1>
        <ul>
          <li>Choose a template and the text of your choice.</li>
          <li>Right-click to save image.</li>
          <li>Leave the text fields empty to generate default meme!</li>
        </ul>
      </header>
      <section className='memes'>
        {isModalOpen && currentModal.id && (
          <Modal
            id={currentModal.id}
            name={currentModal.name}
            blank={currentModal.blank}
            lines={currentModal.lines}
            handleCloseModal={handleCloseModal}
          />
        )}
        {memes?.map((meme) => {
          return (
            <div key={meme.id} className="card">
              <img src={meme.blank} alt={meme.name} loading="lazy" />
              <p>{meme.name}</p>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => handleOpenModal({
                  id: meme.id,
                  name: meme.name,
                  blank: meme.blank,
                  lines: meme.lines,
                })
                }
              >
                Generate
              </button>
            </div>
          )
        })}
      </section>
    </div>
  );
}

export default App;
