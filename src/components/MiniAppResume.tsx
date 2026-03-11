import { useState } from "react"

const QUESTIONS = [
  {
    id: 1,
    text: "Когда меня хвалят за работу, я думаю, что люди просто вежливы или не знают правды о моих реальных способностях.",
  },
  {
    id: 2,
    text: "Я боюсь, что другие люди обнаружат, что я не такой компетентный, каким кажусь.",
  },
  {
    id: 3,
    text: "Мне кажется, что мои успехи — это результат удачи, а не моих реальных знаний и усилий.",
  },
  {
    id: 4,
    text: "Когда я достигаю цели, я преуменьшаю её важность или ищу причины, почему это не так уж значимо.",
  },
  {
    id: 5,
    text: "Мне тяжело принять похвалу или комплимент — я чувствую неловкость или не верю в их искренность.",
  },
  {
    id: 6,
    text: "Сравнивая себя с коллегами или сверстниками, я чувствую, что они гораздо умнее и компетентнее меня.",
  },
  {
    id: 7,
    text: "Я часто откладываю важные дела из-за страха, что результат окажется недостаточно хорошим.",
  },
  {
    id: 8,
    text: "Получив новую должность или возможность, я думаю: «Они совершили ошибку, выбрав меня».",
  },
  {
    id: 9,
    text: "Я трачу значительно больше времени на задачи, чем требуется, чтобы убедиться в их «идеальности».",
  },
  {
    id: 10,
    text: "Когда проект идёт хорошо, я жду, что что-то обязательно пойдёт не так и «раскроет» мою некомпетентность.",
  },
]

const OPTIONS = [
  { label: "Никогда", value: 0 },
  { label: "Иногда", value: 1 },
  { label: "Часто", value: 2 },
  { label: "Всегда", value: 3 },
]

function getResult(score: number) {
  if (score <= 7)
    return {
      level: "Низкий уровень",
      color: "bg-green-100 border-green-500",
      accent: "text-green-700",
      description:
        "Синдром самозванца выражен слабо. Вы в целом адекватно оцениваете свои достижения и способности. Продолжайте развивать уверенность в себе!",
    }
  if (score <= 17)
    return {
      level: "Умеренный уровень",
      color: "bg-yellow-100 border-yellow-500",
      accent: "text-yellow-700",
      description:
        "Признаки синдрома самозванца присутствуют. Вы периодически сомневаетесь в себе. Практики рефлексии и упражнения из раздела «Упражнения» помогут вам.",
    }
  return {
    level: "Высокий уровень",
    color: "bg-red-100 border-red-500",
    accent: "text-red-700",
    description:
      "Синдром самозванца выражен значительно. Важно начать работу с этим паттерном. Рекомендуем пройти все упражнения из нашего комплекса и, при возможности, обратиться к специалисту.",
  }
}

export function MiniAppResume() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResult, setShowResult] = useState(false)

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const answered = Object.keys(answers).length
  const result = getResult(totalScore)

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = () => {
    if (answered === QUESTIONS.length) setShowResult(true)
  }

  const handleReset = () => {
    setAnswers({})
    setShowResult(false)
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black mb-2 border-b-[3px] border-black pb-2">Тест на синдром самозванца</h2>
      <p className="text-gray-600 mb-6 font-medium">
        Оцените каждое утверждение по частоте, с которой оно применимо к вам.
      </p>

      {!showResult ? (
        <div className="space-y-4">
          {QUESTIONS.map((q) => (
            <div
              key={q.id}
              className="bg-white p-5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="font-bold mb-3 text-base leading-snug">
                <span className="text-[#FF2E63] mr-2">{q.id}.</span>
                {q.text}
              </p>
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(q.id, opt.value)}
                    className={`px-4 py-2 border-[2px] border-black font-bold text-sm transition-all ${
                      answers[q.id] === opt.value
                        ? "bg-[#FF2E63] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <span className="font-bold text-gray-600">
              Отвечено: {answered} / {QUESTIONS.length}
            </span>
            <button
              onClick={handleSubmit}
              disabled={answered < QUESTIONS.length}
              className={`px-8 py-3 border-[3px] border-black font-black text-lg transition-all ${
                answered === QUESTIONS.length
                  ? "bg-[#FF2E63] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Узнать результат
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${result.color}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-2xl font-black ${result.accent}`}>{result.level}</h3>
              <span className="text-3xl font-black border-[3px] border-black bg-white px-4 py-1">
                {totalScore} / 30
              </span>
            </div>
            <p className="text-lg leading-relaxed font-medium">{result.description}</p>
          </div>

          <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black mb-3">Что делать дальше?</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-black text-[#FF2E63]">→</span>
                <span>Перейдите в раздел <strong>«Упражнения»</strong> — там комплекс практик для работы с синдромом</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-black text-[#FF2E63]">→</span>
                <span>Прочитайте <strong>«Гайд для родителей»</strong>, если хотите помочь близкому человеку</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-3 bg-white text-black border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black"
          >
            Пройти тест заново
          </button>
        </div>
      )}
    </div>
  )
}
