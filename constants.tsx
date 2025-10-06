import React from 'react';
import type { Module } from './types';
import { InteractionType } from './types';
import { DataPacketIcon, ShieldCheckIcon, BugIcon, UserFocusIcon, CommunityIcon, VpnIcon, KeyIcon, LockIcon, AwarenessBadgeIcon, ConsentBadgeIcon, ArchitectBadgeIcon, GuardianBadgeIcon, CommunityBadgeIcon } from './components/icons/Icons';

export const MODULES: Module[] = [
  {
    id: 1,
    missionTitle: 'Missão 1: O Preço da Diversão',
    title: 'O Preço da Diversão',
    icon: <DataPacketIcon />,
    concept: 'Seu lazer gera dados valiosos que fortalecem os impérios corporativos.',
    description: (
      <p>
        Cada clique, cada segundo em um jogo... tudo isso é coletado. Chamamos isso de <strong className="text-amber-400">"excedente comportamental"</strong>. Os jogos usam protocolos rápidos (UDP) para enviar pacotes de dados sobre seu comportamento. Sua diversão se torna a matéria-prima que alimenta um mercado invisível.
      </p>
    ),
    interaction: {
      title: 'Desafio: Identifique os Coletores',
      type: InteractionType.SIMULATION,
      description: 'Em uma tela de jogo, certos elementos são iscas de dados. Clique nos 3 elementos que mais contribuem para essa coleta para fortalecer suas defesas.',
      data: {
          elements: [
              { id: 'reward', label: 'Recompensa Diária', description: 'Incentiva o login constante, criando um hábito e gerando dados de frequência.' },
              { id: 'popup', label: 'Oferta por Tempo Limitado', description: 'Cria urgência, medindo sua resposta a estímulos de compra e impulsionando o engajamento.' },
              { id: 'leaderboard', label: 'Ranking de Jogadores', description: 'Promove a competição, aumentando o tempo de jogo para gerar mais dados de desempenho.' },
          ],
          completionThreshold: 3,
      }
    },
    reward: {
      badge: <AwarenessBadgeIcon />,
      text: 'Você adquiriu o Olho da Vigilância! Agora você pode ver as táticas invisíveis de coleta de dados.'
    },
    takeaways: {
      title: 'Tesouros Adquiridos:',
      points: [
        { text: 'Use uma VPN para camuflar seu tráfego e proteger sua identidade.', icon: <VpnIcon /> },
        { text: 'Desconfie de designs feitos para te prender no jogo (retenção predatória).', icon: <UserFocusIcon /> },
        { text: 'Prefira jogos transparentes sobre a coleta de dados.', icon: <ShieldCheckIcon /> },
      ],
    },
  },
  {
    id: 2,
    missionTitle: 'Missão 2: Consentimento de Fachada',
    title: 'Consentimento de Fachada',
    icon: <ShieldCheckIcon />,
    concept: 'Clicar em "Aceitar" não é um consentimento justo, é uma rendição planejada.',
    description: (
       <p>
        A <strong className="text-amber-400">Lei Geral de Proteção de Dados (LGPD)</strong> exige que seu consentimento seja livre e claro. Mas muitos jogos usam <strong className="text-amber-400">"dark patterns"</strong>: botões de "Aceitar" gigantes e coloridos, enquanto as opções de recusa são escondidas. É uma armadilha para te fazer concordar com tudo sem pensar.
      </p>
    ),
    interaction: {
      title: 'Quiz: Desvende a Armadilha',
      type: InteractionType.QUIZ,
      description: 'Analise os pop-ups de consentimento. Qual deles usa um "dark pattern" para roubar seu consentimento? Escolha o vilão para vencer.',
      data: {
          questions: [{
              image: 'https://i.imgur.com/gY5zP7c.png',
              caption: 'Pop-up A: Design claro com opções de mesmo peso visual.',
              options: [{ text: 'Pop-up A', isCorrect: false }],
              feedback: 'O Pop-up B é o "dark pattern". O botão "Aceitar Tudo" é dominante, enquanto a opção de personalizar é quase invisível, um truque para desencorajar o controle da sua privacidade.'
          },
          {
            image: 'https://i.imgur.com/dn9Hm0N.png',
            caption: 'Pop-up B: Botão de aceitar destacado, opção de configurar escondida.',
            options: [{ text: 'Pop-up B', isCorrect: true }],
            feedback: 'Exato! O design do Pop-up B é uma armadilha clássica. Ele te guia para a opção menos privada, explorando a tendência humana de seguir o caminho mais fácil.'
          }]
      }
    },
    reward: {
      badge: <ConsentBadgeIcon />,
      text: 'Você forjou o Escudo da Clareza! Sua capacidade de detectar "dark patterns" e proteger seus direitos foi aprimorada.'
    },
    takeaways: {
      title: 'Tesouros Adquiridos:',
      points: [
        { text: 'Sempre procure por "Gerenciar Opções" ou "Personalizar".', icon: <UserFocusIcon /> },
        { text: 'Leia os termos com atenção. Se for vago, é suspeito.', icon: <ShieldCheckIcon /> },
        { text: 'Lembre-se: seu consentimento é valioso. Não o entregue de graça.', icon: <KeyIcon /> },
      ],
    },
  },
  {
    id: 3,
    missionTitle: 'Missão 3: Ameaças Internas',
    title: 'Ameaças que Vêm de Dentro',
    icon: <BugIcon />,
    concept: 'A falta de segurança no design dos jogos deixa as portas do seu castelo abertas.',
    description: (
        <p>
        Falhas graves, as <strong className="text-amber-400">"CVEs"</strong>, podem existir em jogos famosos. O Log4Shell, por exemplo, afetou até o Minecraft. A indústria raramente segue o <strong className="text-amber-400">"Secure by Design"</strong>, lançando jogos com brechas que podem expor seus dados ou até o controle do seu PC.
      </p>
    ),
    interaction: {
      title: 'Puzzle: Erga as Defesas!',
      type: InteractionType.PUZZLE,
      description: 'Seu servidor está sob ataque! Arraste as defesas corretas para neutralizar cada ameaça e proteger sua fortaleza digital.',
      data: {
          vulnerabilities: [
              { id: 'phishing', name: 'Ataque de Phishing', description: 'Um e-mail falso tenta roubar sua senha.' },
              { id: 'bruteforce', name: 'Ataque de Força Bruta', description: 'Um bot tenta adivinhar sua senha milhares de vezes.' },
          ],
          defenses: [
              { id: 'mfa', name: 'Autenticação Multifator (MFA)', counter: 'bruteforce' },
              { id: 'verify_source', name: 'Verificar Remetente do Email', counter: 'phishing' },
          ]
      }
    },
    reward: {
      badge: <ArchitectBadgeIcon />,
      text: 'Você se tornou um Arquiteto da Segurança! Suas defesas contra ataques comuns estão mais fortes do que nunca.'
    },
    takeaways: {
      title: 'Tesouros Adquiridos:',
      points: [
        { text: 'Ative a Autenticação de Dois Fatores (MFA) em TUDO.', icon: <LockIcon /> },
        { text: 'Use um gerenciador para criar e guardar senhas fortes e únicas.', icon: <KeyIcon /> },
        { text: 'Mantenha seus jogos e sistema sempre atualizados para corrigir brechas.', icon: <ShieldCheckIcon /> },
      ],
    },
  },
  {
    id: 4,
    missionTitle: 'Missão 4: O Paradoxo do Superusuário',
    title: 'O Paradoxo do Superusuário',
    icon: <UserFocusIcon />,
    concept: 'Sistemas anti-cheat podem ser mais invasivos que um vírus para proteger o "jogo justo".',
    description: (
      <p>
        Para barrar trapaceiros, alguns sistemas <strong className="text-amber-400">anti-cheat</strong> operam no nível mais profundo do seu sistema (kernel ou "Ring 0"). Isso dá a eles acesso TOTAL a tudo no seu PC, batendo de frente com seu direito à privacidade da LGPD. Eles podem, teoricamente, ver tudo o que você faz, mesmo fora do jogo.
      </p>
    ),
    interaction: {
      title: 'Debate: Jogo Justo vs. Invasão de Privacidade',
      type: InteractionType.DEBATE,
      description: 'Não há resposta fácil. Reflita sobre os argumentos de cada lado. Qual valor é mais importante para você? Sua reflexão é a sua maior arma.',
       data: {
          sideA: { 
              title: 'A Defesa do Jogo Justo',
              points: [
                  'Trapaceiros arruínam a experiência para todos.',
                  'Anti-cheats potentes são necessários para o cenário competitivo.',
                  'Se você não tem nada a esconder, não há problema.',
              ]
          },
          sideB: {
              title: 'A Defesa da Privacidade',
              points: [
                  'Nenhuma empresa deveria ter acesso irrestrito ao meu PC.',
                  'Uma falha no anti-cheat pode ser uma porta de entrada para hackers.',
                  'Isso normaliza a vigilância e abre mão de direitos fundamentais.',
              ]
          }
      }
    },
    reward: {
      badge: <GuardianBadgeIcon />,
      text: 'Você conquistou a Insígnia do Guardião Consciente! Sua habilidade de pesar os riscos e benefícios de tecnologias invasivas foi aprimorada.'
    },
    takeaways: {
      title: 'Tesouros Adquiridos:',
      points: [
        { text: 'Pesquise o tipo de anti-cheat de um jogo ANTES de instalar.', icon: <UserFocusIcon /> },
        { text: 'Considere usar partições ou máquinas virtuais para jogos invasivos.', icon: <ShieldCheckIcon /> },
        { text: 'Participe de comunidades que exigem mais privacidade das empresas.', icon: <CommunityIcon /> },
      ],
    },
  },
  {
    id: 5,
    missionTitle: 'Missão 5: A Guilda da Periferia Digital',
    title: 'Agência na Periferia Digital',
    icon: <CommunityIcon />,
    concept: 'Sua comunidade é a sua maior aliada na proteção digital.',
    description: (
      <p>
        A infraestrutura de internet nas periferias muitas vezes é precária, mas é nesses espaços que surgem as maiores estratégias de <strong className="text-amber-400">solidariedade e resistência</strong>. Compartilhar conhecimento, ajudar um ao outro a configurar uma VPN ou identificar um app malicioso são os movimentos mais poderosos da sua guilda.
      </p>
    ),
    interaction: {
      title: 'Mapa de Ação: Forme sua Guilda',
      type: InteractionType.ACTION_MAP,
      description: 'A proteção é um esforço coletivo. Comece hoje a construir uma comunidade mais segura com estas ações e conclua sua jornada.',
      data: {
          steps: [
              { title: 'Compartilhe o Conhecimento', description: 'Envie uma dica deste app para um amigo no WhatsApp. A primeira barreira contra a desinformação é a conversa.' },
              { title: 'Inspecione seus Apps', description: 'Vá nas configurações do seu celular e veja as permissões de um app. Ele realmente precisa de acesso ao seu microfone e contatos?' },
              { title: 'Inicie a Conversa', description: 'Puxe o assunto sobre privacidade no seu grupo de jogos no Discord. Pergunte o que os outros pensam sobre anti-cheats ou coleta de dados.' },
          ]
      }
    },
    reward: {
      badge: <CommunityBadgeIcon />,
      text: 'Você é um Líder da Guilda Digital! Sua jornada para proteger a si e à sua comunidade está completa. Continue compartilhando o conhecimento.'
    },
    takeaways: {
      title: 'Tesouros Adquiridos:',
      points: [
        { text: 'Compartilhe o que aprendeu com seus amigos e familiares.', icon: <CommunityIcon /> },
        { text: 'Crie e participe de espaços seguros para discutir tecnologia e privacidade.', icon: <CommunityIcon /> },
        { text: 'Juntos, podemos exigir melhores práticas das empresas de jogos.', icon: <UserFocusIcon /> },
      ],
    },
  },
];
