describe("State", () => {

  it('states are any serializable objects', () => {
    const state = { 
      visibilityFilter: 'SHOW_ALL',
      todos: [
        {
          id: 123,
          text: 'Learn Redux',
          completed: false,
        },
      ],
    };

    expect(solveme).toBeInstanceOf(Object);
  });

});
