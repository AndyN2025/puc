<template>
  <div class="organization-info">
    <div class="info-grid">
      
      <div class="info-label">Полное наименование образовательной организации</div>
      <div class="info-value">
        Автономная некоммерческая организация дополнительного профессионального образования «Приокский учебный центр»
      </div>

      
      <div class="info-label">Сокращенное наименование образовательной организации</div>
      <div class="info-value">АНО ДПО «ПУЦ»</div>

      
      <div class="info-label">Дата создания образовательной организации</div>
      <div class="info-value">05.05.2014 г.</div>

      
      <div class="info-label">Информация об учредителе</div>
      <div class="info-value">Смоловик Андрей Евгеньевич</div>

      
      <div class="info-label">Адрес местонахождения образовательной организации</div>
      <div class="info-value">
        248002, Калужская область, г. Калуга, ул. Никитина, д. 41 помещ. 6
      </div>

      
      <div class="info-label">Режим, график работы</div>
      <div class="info-value">
        Понедельник - пятница с 08:00 по 17:00
        <br />
        Суббота, воскресенье - выходной
      </div>

      
      <div class="info-label">Контактные телефоны</div>
      <div class="info-value phones">
        <a href="tel:+74842562183" class="phone-link">8 (4842) 56-21-83</a>
        <a href="tel:+74842597583" class="phone-link">8 (4842) 59-75-83</a>
        <a href="tel:+79105201564" class="phone-link">8 (910) 520-15-64</a>
      </div>

      
      <div class="info-label">Адрес электронной почты</div>
      <div class="info-value">
        <a href="mailto:ekc_06@mail.ru" class="email-link">ekc_06@mail.ru</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.organization-info {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 60px;
}

.info-grid {
  display: grid;
  grid-template-columns: 3fr 10fr;
  gap: 16px 24px;
  width: 100%;
}

.info-label {
  font-family: 'IBM M';
  color: #1f2937;
  background-color: #eaf6ff;
  padding: 16px;
  align-self: start;
  min-height: 88px;
}

.info-value {
  color: #374151;
  padding: 16px;
  align-self: start;
  font-size: 18px;

  &.phones{
    padding: 0 8px;
  }
}

.info-grid > :nth-child(-n + 2) {
  border-top: none;
}

.info-grid > :nth-last-child(-n + 2) {
  border-bottom: none;
}

.phone-link {
  display: block;
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;
  margin-bottom: 4px;
}

.phone-link:last-child {
  margin-bottom: 0;
}

.phone-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.email-link {
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;
}

.email-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .info-label {
    font-size: 15px;
    padding: 12px;
    font-weight: 500;
  }

  .info-value {
    font-size: 15px;
    padding: 12px;
  }

  .info-label,
  .info-value {
    border: none;
    background-color: transparent;
  }

  .info-value {
    padding-left: 12px;
  }
}
</style>