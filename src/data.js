const controls = [
  {
    id: 1,
    title: 'Matriz de Maturidade - 0001',
    maturityAtual: 2,
    audit: 2,
    maturityExpected: 5,
    subcontrols: [
      {
        id: '0001',
        title: 'Auditoria - 0001',
        maturityAtual: 2,
        maturityExpected: 5,
      },
    ],
  },
  {
    id: 2,
    title: 'Matriz de Maturidade - 0002',
    maturityAtual: 2,
    maturityExpected: 5,
    subcontrols: [
      {
        id: '0002',
        title: 'Auditoria - 0002',
        maturityAtual: 2,
        maturityExpected: 5,
      },
    ],
  },
];

export default controls;
