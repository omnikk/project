import React from "react";

const ServiceSelector = ({ services, selectedService, onSelectService }) => {
  // Гифки для каждой услуги (работают онлайн с Tenor)
  const serviceGifs = {
    "Стрижка": "https://media1.tenor.com/m/42JB8mLOSXgAAAAd/beautiful-woman-blonde.gif",
    "Окрашивание": "https://media1.tenor.com/m/vrRhuYFenjgAAAAd/hair-dye-hair-dye-color.gif",
    "Укладка": "https://media1.tenor.com/m/Rtrqc_adivAAAAAd/brushing-hair-tingting-asmr.gif",
    "Маникюр": "https://media1.tenor.com/m/hN2UJRJE3VYAAAAd/nails-art-nail-ideas.gif",
    "Педикюр": "https://media1.tenor.com/m/AdDF42q9Y1YAAAAC/pedicure.gif",
    "SPA-уход": "https://media1.tenor.com/m/DHAzKE8OCPQAAAAC/spa-day-griselda.gif",
    "Мелирование": "https://media1.tenor.com/m/OgYwhGUaegYAAAAd/colored-hair-purple.gif",
    "Химическая завивка": "https://media1.tenor.com/m/2zxXEL6-FnEAAAAC/hair-salon-hair.gif",
    "Кератиновое выпрямление": "https://media1.tenor.com/m/Lio67jHmduQAAAAd/rebond-hair.gif"
  };
  // Длительность услуг в минутах
  const serviceDuration = {
    "Стрижка": 45,
    "Окрашивание": 120,
    "Укладка": 30,
    "Маникюр": 60,
    "Педикюр": 75,
    "SPA-уход": 90,
    "Мелирование": 150,
    "Химическая завивка": 180,
    "Кератиновое выпрямление": 120
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    }}>
      {services.map((service, index) => (
        <div
          key={index}
          onClick={() => onSelectService(service)}
          className="service-card"
          style={{
            position: 'relative',
            height: '250px',
            borderRadius: '15px',
            overflow: 'hidden',
            cursor: 'pointer',
            border: selectedService?.name === service.name 
              ? '4px solid transparent' 
              : '2px solid transparent',
            backgroundImage: selectedService?.name === service.name
              ? 'linear-gradient(white, white), linear-gradient(135deg, #667eea, #764ba2, #f093fb)'
              : 'none',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: selectedService?.name === service.name
              ? '0 8px 25px rgba(102, 126, 234, 0.4)'
              : '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            transform: selectedService?.name === service.name ? 'scale(1.03)' : 'scale(1)'
          }}
        >
          {/* Фоновая гифка */}
          <div
            className="service-background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${serviceGifs[service.name] || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(3px) brightness(0.5)',
              transition: 'all 0.4s ease',
              opacity: 0.7
            }}
          />

          {/* Контент поверх фона */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))'
          }}>
            <div>
              <h3 style={{
                color: 'white',
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '10px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}>
                {service.name}
              </h3>
              
              {/* Бейджи популярности */}
              {(service.name === "Маникюр" || service.name === "Стрижка") && (
                <span style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 8px rgba(255,107,107,0.4)'
                }}>
                  🔥 Хит
                </span>
              )}
              
              {(service.name === "Окрашивание" || service.name === "SPA-уход") && (
                <span style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 8px rgba(240,147,251,0.4)'
                }}>
                  ⭐ Популярное
                </span>
              )}
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.95)',
              padding: '12px 18px',
              borderRadius: '25px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '5px'
              }}>
                {service.price.toLocaleString()} ₽
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: '#666',
                fontWeight: '600'
              }}>
                🕐 {serviceDuration[service.name]} мин
              </div>
            </div>
          </div>

          {/* Галочка на выбранной карточке */}
          {selectedService?.name === service.name && (
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#667eea',
              color: 'white',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              zIndex: 3,
              boxShadow: '0 3px 10px rgba(102, 126, 234, 0.5)'
            }}>
              ✓
            </div>
          )}
        </div>
      ))}

      <style>{`
        .service-card:hover .service-background {
          filter: blur(0px) brightness(0.8);
          opacity: 1;
        }
        
        .service-card:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3) !important;
        }
        
        .service-card:active {
          transform: scale(0.98) !important;
        }
        
        @keyframes selectPulse {
          0% { transform: scale(1.03); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
};

export default ServiceSelector;
