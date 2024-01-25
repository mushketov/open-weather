import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import freezing from '../../assets/images/freezing.png'
import veryCold from '../../assets/images/veryCold.png'
import cold from '../../assets/images/cold.png'
import cool from '../../assets/images/cool.png'
import comfortable from '../../assets/images/comfortable.png'
import warm from '../../assets/images/warm.png'
import hot from '../../assets/images/hot.png'
// import { Md3DRotation } from 'react-icons/md'

const Main = () => {
	const [weatherData, setWeatherData] = useState(null)
	const [bg, setBg] = useState(null)
	const updateTemperature = (weatherRes) => {
		const temperature = weatherRes.main.temp
		if (temperature >= 35) {
			setBg(hot)
		} else if (temperature >= 29) {
			setBg(warm)
		} else if (temperature >= 24) {
			setBg(comfortable)
		} else if (temperature >= 18) {
			setBg(cool)
		} else if (temperature >= 13) {
			setBg(cold)
		} else if (temperature >= 7) {
			setBg(veryCold)
		} else if (temperature <= 0 || temperature >= 0) {
			setBg(freezing)
		}
	}
	const handleClick = (event) => {
		event.preventDefault()
		const city = event.target[0].value
		//todo: ключ перекинуть в dotenv
		const apiKey = 'e68ba6e8f834a6a1e85ad6d0c562a2f5'
		//отравляем запрос
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`
		)
			// преобразуем в json
			.then((res) => res.json())
			.then((res) => {
				//передаём в хук
				if (res.cod === 200) {
					setWeatherData(res)
					updateTemperature(res)
				} else {
					//в случае ошибки
					toast(res.message)
				}
			})
	}
	const weatherDescriptionCards = [
		{
			id: 1,
			icon: null,
			title: 'Город: ',
			data: weatherData.name,
		},
		{
			id: 2,
			icon: null,
			title: 'Температура: ',
			data: Math.round(weatherData.main.temp) + '°',
		},
		{
			id: 3,
			icon: null,
			title: 'Ветер: ',
			data: weatherData.wind.speed + 'м/с',
		},
		{
			id: 4,
			icon: null,
			title: 'Облака: ',
			data: weatherData.weather[0].description,
		},
		{
			id: 5,
			icon: null,
			title: 'asssf',
			data: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
		},
		{
			id: 6,
			icon: null,
			title: '33rr',
			data: bg,
		},
	]

	return (
		<>
			<div className='container'>
				<h2>Прогноз погоды</h2>
				<form onSubmit={handleClick}>
					<input type='text' placeholder='Название города' name='' id='' />
					<button type='submit'>enter</button>
				</form>
				{/* выводим данные в разметку */}

				{weatherData ? (
					<>
						<div className='section section__description'>
							{weatherDescriptionCards.map((card) => {
								return (
									<div className='card'>
										<div className='descripton__card-icon'>
											{card.icon}
											<span>{card.title}</span>
										</div>
									</div>
								)
							})}
						</div>
					</>
				) : null}
				<img className='temperature-icon' src={bg} alt='' />
			</div>
			{/* уведомления */}
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				theme='dark'
				pauseOnHover
			/>
		</>
	)
}

export default Main
