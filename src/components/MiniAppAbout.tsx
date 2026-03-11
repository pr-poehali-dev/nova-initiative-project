export function MiniAppAbout() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">О проекте</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black mb-4">Что такое синдром самозванца?</h3>
          <p className="text-lg leading-relaxed mb-4">
            Синдром самозванца — это устойчивое ощущение, что ваши достижения случайны, а успех — лишь удача или обман
            окружающих. Человек убеждён: «Я недостаточно компетентен», «Меня скоро разоблачат».
          </p>
          <p className="text-lg leading-relaxed">
            Этот феномен широко распространён среди студентов, специалистов и творческих людей. Хорошая новость —
            с ним можно работать. Этот сайт создан именно для этого.
          </p>
        </div>

        <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black mb-4">Что вы найдёте здесь</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Диагностический тест",
              "Практические упражнения",
              "Рефлексивные техники",
              "Гайд для родителей",
              "Научный подход",
              "Пошаговые инструкции",
            ].map((item) => (
              <span
                key={item}
                className="bg-[#FF2E63] text-white px-3 py-1 border-[2px] border-black font-bold text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black mb-4">Для кого этот ресурс?</h3>
          <ul className="space-y-2 text-lg">
            <li className="flex items-start gap-2">
              <span className="font-black text-[#FF2E63]">→</span>
              <span>Люди, которые сомневаются в своих способностях и достижениях</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-black text-[#FF2E63]">→</span>
              <span>Студенты и молодые специалисты, страдающие от «страха разоблачения»</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-black text-[#FF2E63]">→</span>
              <span>Родители, которые хотят помочь своим детям развить здоровую самооценку</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
