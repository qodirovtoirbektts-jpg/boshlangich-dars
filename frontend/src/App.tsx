import React, { useState } from 'react';
import { Scissors, Calendar, MapPin, Clock, ArrowRight, User } from 'lucide-react';

export default function App() {
  const [bookingStep, setBookingStep] = useState(0); // 0 = Home, 1 = Services, 2 = Barber, 3 = Date/Time, 4 = Details

  const services = [
    { id: 1, name: 'Haircut', duration: '30 min', price: '$25', description: 'Classic men\'s haircut with styling.' },
    { id: 2, name: 'Beard Trim', duration: '20 min', price: '$15', description: 'Detailed beard sculpting and trim.' },
    { id: 3, name: 'Full Package', duration: '60 min', price: '$45', description: 'Haircut, beard trim, and hot towel shave.' },
  ];

  const barbers = [
    { id: 1, name: 'John Doe', specialty: 'Classic Cuts' },
    { id: 2, name: 'Alex Smith', specialty: 'Beard Specialist' },
  ];

  return (
    <div className="min-h-screen font-sans bg-barber-dark text-white">
      {/* Navigation */}
      <nav className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900 sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-2 text-barber-gold">
          <Scissors className="w-8 h-8" />
          <span className="text-xl font-bold tracking-wider uppercase">Elite Barber</span>
        </div>
        <button 
          onClick={() => setBookingStep(1)} 
          className="bg-barber-gold text-barber-dark px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
        >
          Book Now
        </button>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {bookingStep === 0 && (
          <div className="space-y-24">
            {/* Hero Section */}
            <section className="text-center space-y-8 mt-12">
              <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-barber-gold to-yellow-200">
                Premium Grooming <br /> for Modern Men
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Experience top-tier haircuts, beard trims, and hot towel shaves in a relaxing, luxurious atmosphere.
              </p>
              <button 
                onClick={() => setBookingStep(1)}
                className="inline-flex items-center space-x-2 bg-barber-gold text-barber-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/20"
              >
                <span>Book Your Appointment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </section>

            {/* Info Section */}
            <section className="grid md:grid-cols-3 gap-8 text-center border-t border-gray-800 pt-16">
              <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
                <MapPin className="w-10 h-10 mx-auto text-barber-gold mb-4" />
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-gray-400">123 Grooming Street<br/>Tashkent, Uzbekistan</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
                <Clock className="w-10 h-10 mx-auto text-barber-gold mb-4" />
                <h3 className="text-xl font-bold mb-2">Working Hours</h3>
                <p className="text-gray-400">Mon-Sun: 9:00 AM - 9:00 PM<br/>No days off</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
                <Calendar className="w-10 h-10 mx-auto text-barber-gold mb-4" />
                <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
                <p className="text-gray-400">24/7 online reservation<br/>Pick your time & master</p>
              </div>
            </section>
          </div>
        )}

        {/* Multi-step Booking Form UI Mockup */}
        {bookingStep > 0 && (
          <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl">
            {/* Stepper */}
            <div className="flex justify-between mb-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 -translate-y-1/2 rounded-full"></div>
              <div className="absolute top-1/2 left-0 h-1 bg-barber-gold -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${((bookingStep - 1) / 3) * 100}%` }}></div>
              
              {[1, 2, 3, 4].map(step => (
                <div key={step} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${bookingStep >= step ? 'bg-barber-gold text-barber-dark' : 'bg-gray-800 text-gray-500'}`}>
                  {step}
                </div>
              ))}
            </div>

            {/* Step 1: Services */}
            {bookingStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-bold text-center mb-8">Select Service</h2>
                <div className="grid gap-4">
                  {services.map(s => (
                    <div key={s.id} className="p-6 rounded-2xl border border-gray-700 hover:border-barber-gold cursor-pointer transition-all bg-gray-800 flex justify-between items-center group">
                      <div>
                        <h4 className="text-xl font-bold group-hover:text-barber-gold transition-colors">{s.name}</h4>
                        <p className="text-gray-400 mt-1">{s.description}</p>
                        <p className="text-sm text-gray-500 mt-2 flex items-center"><Clock className="w-4 h-4 mr-1"/> {s.duration}</p>
                      </div>
                      <div className="text-2xl font-bold text-barber-gold">{s.price}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={() => setBookingStep(2)} className="bg-barber-gold text-barber-dark px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all flex items-center">
                    Next Step <ArrowRight className="w-5 h-5 ml-2"/>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Barber */}
            {bookingStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-bold text-center mb-8">Choose Barber</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {barbers.map(b => (
                    <div key={b.id} className="p-6 rounded-2xl border border-gray-700 hover:border-barber-gold cursor-pointer transition-all bg-gray-800 text-center group">
                      <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-barber-gold/20 transition-colors">
                        <User className="w-12 h-12 text-gray-400 group-hover:text-barber-gold transition-colors" />
                      </div>
                      <h4 className="text-xl font-bold">{b.name}</h4>
                      <p className="text-gray-400 mt-1">{b.specialty}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between">
                  <button onClick={() => setBookingStep(1)} className="text-gray-400 hover:text-white px-8 py-3 font-bold transition-colors">Back</button>
                  <button onClick={() => setBookingStep(3)} className="bg-barber-gold text-barber-dark px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all">Next Step</button>
                </div>
              </div>
            )}

            {/* Steps 3 & 4: Placeholders for brevity */}
            {bookingStep === 3 && (
              <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Calendar className="w-16 h-16 mx-auto text-barber-gold mb-6" />
                <h2 className="text-3xl font-bold mb-4">Select Date & Time</h2>
                <p className="text-gray-400 mb-8">Calendar integration goes here.</p>
                <div className="mt-8 flex justify-between w-full">
                  <button onClick={() => setBookingStep(2)} className="text-gray-400 hover:text-white px-8 py-3 font-bold">Back</button>
                  <button onClick={() => setBookingStep(4)} className="bg-barber-gold text-barber-dark px-8 py-3 rounded-full font-bold">Next Step</button>
                </div>
              </div>
            )}

            {bookingStep === 4 && (
              <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-bold mb-4">Confirm Details</h2>
                <p className="text-gray-400 mb-8">Contact form & confirmation goes here.</p>
                <div className="mt-8 flex justify-between w-full">
                  <button onClick={() => setBookingStep(3)} className="text-gray-400 hover:text-white px-8 py-3 font-bold">Back</button>
                  <button onClick={() => { alert('Booking Confirmed!'); setBookingStep(0); }} className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-400">Confirm Booking</button>
                </div>
              </div>
            )}
            
          </div>
        )}
      </main>
    </div>
  );
}
