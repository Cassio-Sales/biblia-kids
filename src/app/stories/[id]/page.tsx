'use client'

import { useParams } from 'next/navigation'
import { useState, type ReactElement } from 'react'
import StoryBook from '../../../Components/ui/StoryBook'

interface Story {
  title: string
  pages: string[]
  subtitles: string[]
  texts: string[]
}

const stories: Record<string, Story> = {
  'davi-golias': {
    title: 'Davi e Golias',
    pages: [
      '/assets/stories/davi-golias/1.png',
      '/assets/stories/davi-golias/2.png',
      '/assets/stories/davi-golias/3.png',
      '/assets/stories/davi-golias/4.png',
      '/assets/stories/davi-golias/5.png',
      '/assets/stories/davi-golias/6.png',
      '/assets/stories/davi-golias/7.png',
      '/assets/stories/davi-golias/8.png',
      '/assets/stories/davi-golias/9.png',
      '/assets/stories/davi-golias/10.png',
      '/assets/stories/davi-golias/11.png',
      '/assets/stories/davi-golias/12.png',
      '/assets/stories/davi-golias/13.png',
      '/assets/stories/davi-golias/14.png',
      '/assets/stories/davi-golias/15.png'
    ],
    subtitles: [
      'O Vale da Batalha',
      'O Jovem Pastor',
      'O Pedido do Pai',
      'A Chegada ao Campo de Guerra',
      'O Irmão Bravo',
      'Davi é Chamado pelo Rei',
      'A Coragem que Vem de Deus',
      'A Armadura Pesada',
      'As Pedrinhas do Riacho',
      'O Encontro com o Gigante',
      'A Vitória de Davi',
      'A Alegria de Israel',
      'Davi diante do Rei',
      'O Novo Amigo',
      'A Grande Lição'
    ],
    texts: [
      `Os israelitas e os filisteus estavam em dois montes, com um vale entre eles.

      Todos os dias, um gigante chamado Golias saía do acampamento filisteu. Ele era enorme, usava armadura brilhante e uma lança pesada como um tronco.

      Golias gritava: “Mandem um homem para lutar comigo! Se ele vencer, seremos seus servos. Mas se eu vencer, vocês servirão a nós!” 
      
      Durante quarenta dias, ele fez isso e ninguém teve coragem de enfrentá-lo.`,

      `Em Belém vivia um menino chamado Davi. Ele era o filho mais novo de Jessé e cuidava das ovelhas do seu pai.
      
      Enquanto apascentava, Davi tocava harpa e cantava cânticos para Deus.
      
      Às vezes, enfrentava animais perigosos, mas sempre confiava que o Senhor o protegeria. 
      
      Embora ainda fosse muito jovem, sua fé era enorme.`,

      `Um dia, Jessé chamou Davi e disse:
      “Leve estes pães e grãos para seus irmãos no campo de batalha e veja se eles estão bem.”
      Davi acordou bem cedo, deixou as ovelhas com um ajudante e partiu com a comida.
      Ele caminhou até o vale onde o exército de Israel se preparava para lutar.
      Mal sabia ele que Deus o havia escolhido para algo muito maior.`,

      `Quando Davi chegou, ouviu o barulho dos guerreiros gritando.
      Mas logo depois, todos ficaram em silêncio.
      Golias apareceu de novo, zombando e desafiando o povo de Deus.
      Os soldados fugiam, tremendo de medo.
      Davi perguntou: “Quem é esse gigante para desafiar o exército do Deus vivo?”
      Os homens contaram que o rei Saul prometera recompensar quem o vencesse.`,

      `Quando Eliabe, o irmão mais velho de Davi, ouviu isso, ficou irritado.
      “Por que você veio aqui? E com quem deixou aquelas poucas ovelhas?”
      Mas Davi respondeu com calma:
      “Eu só fiz uma pergunta. Não posso nem falar?”
      Mesmo assim, suas palavras chamaram atenção e logo chegaram aos ouvidos do rei Saul.`,

      `Davi foi levado até Saul.
      O jovem falou com confiança: “Rei, não fique com medo. Eu lutarei contra o gigante.”
      Saul olhou para ele e respondeu:
      “Você é só um menino, e ele é um guerreiro desde a juventude.”
      Mas Davi contou suas experiências como pastor, quando lutou contra um leão e um urso.`,

      `“Quando um leão tentou pegar uma ovelha”, disse Davi, “eu o enfrentei e protegi o rebanho. E fiz o mesmo quando um urso apareceu”.
      “Deus me salvou dessas feras, e Ele também me salvará desse gigante.”
      O rei Saul ficou impressionado e disse: “Vá, e que o Senhor esteja com você.”`,

      `O rei Saul colocou sua armadura em Davi: um capacete de bronze e uma couraça de ferro.
      Mas Davi tentou andar e quase caiu, era tudo muito pesado!
      “Não posso usar isso, não estou acostumado”, disse ele.
      Então tirou a armadura e voltou a vestir suas roupas simples.
      Ele confiava que a força de Deus era suficiente.`,

      `Davi caminhou até o riacho próximo ao vale.
      Ajoelhou-se e escolheu três pedrinhas bem lisas.
      Guardou-as em sua bolsa de pastor e pegou sua funda, a mesma que usava para proteger as ovelhas.
      Com passos firmes, seguiu em direção ao gigante.`,

      `Golias avançou, zombando:
      “Você vem lutar comigo com paus? Eu sou um guerreiro!”
      Mas Davi respondeu com fé:
      “Você vem contra mim com espada e lança,
      mas eu venho contra você em nome do Senhor dos Exércitos!”
      “Hoje o Senhor entregará você em minhas mãos,
      para que todos saibam que Deus dá a vitória!”`,

      `Davi correu em direção ao gigante.
      Pegou uma pedra, colocou na funda e girou com força.
      A pedra voou e atingiu a testa de Golias, e o gigante caiu com um estrondo!
      O exército de Israel gritou de alegria,
      pois Deus havia mostrado Seu poder através de um menino.`,

      `Os filisteus fugiram assustados, e os israelitas correram atrás deles.
      A vitória era completa!
      Todos se alegraram e louvaram a Deus pela grande vitória.
      O rei Saul ficou admirado com o menino corajoso e perguntou:
      “De quem você é filho?”
      E Davi respondeu com respeito: “Sou filho de Jessé, de Belém.”`,

      `Saul levou Davi para o palácio.
      Ele o tratou com honra e o manteve por perto.
      Davi contou tudo o que aconteceu,
      e o rei viu que Deus realmente estava com aquele rapaz.
      Logo Davi se tornaria conhecido em todo o reino.`,

      `O filho do rei, Jônatas, ouviu Davi e sentiu amizade imediata.
      Os dois se tornaram irmãos de coração.
      Jônatas deu a Davi sua capa, sua espada e seu cinto,
      como sinal de aliança e confiança.
      Era o começo de uma amizade fiel que duraria por toda a vida.`,

      `Davi era pequeno aos olhos das pessoas,
      mas cheio de fé e coragem.

      Antes de enfrentar o gigante Golias,
      Deus já tinha ajudado Davi a vencer um leão e um urso para proteger as ovelhas do seu pai.

      Davi sabia que a força verdadeira vem de Deus
      e que Ele ajuda quem confia de todo o coração. Com fé e coragem, Davi venceu o gigante. E nós também podemos vencer nossos medos quando confiamos no Senhor.`
    ]
  }
}

export default function StoryPage(): ReactElement {
  const params = useParams<{ id: string }>()
  const id = params.id
  const story = stories[id]
  const [current, setCurrent] = useState<number>(0)

  if (!story) return <p>História não encontrada.</p>

  return (
    <main className="min-h-screen bg-[#fdfaf3] flex flex-col items-center py-6">
      {/* Título principal */}
      <h1 className="text-2xl md:text-4xl font-bold text-[#D97706] mb-3 text-center leading-tight px-3">
        {story.title}
      </h1>

      {/* Livro interativo */}
      <div className="w-full flex justify-center">
        <StoryBook
          pages={story.pages}
          subtitles={story.subtitles}
          texts={story.texts}
          onPageChange={setCurrent}
        />
      </div>
    </main>
  )
}
