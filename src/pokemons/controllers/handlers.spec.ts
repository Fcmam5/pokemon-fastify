import * as handlers from './handlers';

let httpGetMockResponse;

jest.mock('../../infrastructure/http-client', () => ({
  httpGetWithCache: jest.fn().mockImplementation(() => httpGetMockResponse)
}));

describe('handlers', () => {
  describe('computeResponse', () => {
    describe('computeResponseForOne', () => {
      it('should calculate stats for one Pokemon', () => {
        const rs = handlers.computeResponseForOne(bulbasaurMock);

        expect(rs).toEqual(bulbasaurExpectedResponse);
      });
    });
  });

  describe('getPokemonByName', () => {
    let request;
    let response;
    let mockCode;
    let mockSend;

    beforeEach(() => {
      httpGetMockResponse = null;

      request = {
        params: {
          name: 'alice'
        },
        log: {
          warn: jest.fn(),
          debug: jest.fn()
        }
      };
      mockCode = jest.fn().mockReturnThis();
      mockSend = jest.fn();
      response = {
        code: mockCode,
        send: mockSend
      };
    });

    it('should return a 404 error if the Pokemon is not found', async () => {
      httpGetMockResponse = null;

      await handlers.getPokemonByName(request, response);

      expect(response.code).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalled();
    });

    it('should return the Pokemon data', async () => {
      httpGetMockResponse = bulbasaurMock;

      await handlers.getPokemonByName(request, response);

      expect(response.code).not.toHaveBeenCalledWith(404);
    });
  });

  describe('getAllPokemons', () => {
    let request;
    let response;
    let mockCode;
    let mockSend;

    beforeEach(() => {
      httpGetMockResponse = null;

      request = {
        params: {
          name: 'alice'
        },
        log: {
          warn: jest.fn(),
          debug: jest.fn()
        }
      };
      mockCode = jest.fn().mockReturnThis();
      mockSend = jest.fn();
      response = {
        code: mockCode,
        send: mockSend
      };
    });

    it('should return the list of pokemons', async () => {
      const expected = [bulbasaurExpectedResponse];
      jest.spyOn(handlers, 'computeResponseForSet').mockResolvedValue(expected);

      await handlers.getAllPokemons(request, response);

      expect(response.send).toHaveBeenCalledWith(expected);
    });
  });
});

const bulbasaurMock = {
  abilities: [],
  base_experience: 64,
  forms: [],
  game_indices: [],
  height: 7,
  held_items: [],
  id: 1,
  is_default: true,
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/1/encounters',
  moves: [],
  name: 'bulbasaur',
  order: 1,
  past_types: [],
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
  },
  sprites: {
    back_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
    back_female: null,
    back_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
    back_shiny_female: null,
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    front_female: null,
    front_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
    front_shiny_female: null,
    other: {},
    versions: {}
  },
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/'
      }
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/'
      }
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/'
      }
    },
    {
      base_stat: 65,
      effort: 1,
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/'
      }
    },
    {
      base_stat: 65,
      effort: 0,
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/'
      }
    },
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/'
      }
    }
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/'
      }
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/'
      }
    }
  ],
  weight: 69
};

const bulbasaurExpectedResponse = {
  averageStat: 53,
  base_experience: 64,
  height: 7,
  id: 1,
  name: 'bulbasaur',
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
  },
  sprite_img:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/'
      }
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/'
      }
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/'
      }
    },
    {
      base_stat: 65,
      effort: 1,
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/'
      }
    },
    {
      base_stat: 65,
      effort: 0,
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/'
      }
    },
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/'
      }
    }
  ],
  url: 'https://pokeapi.co/api/v2/pokemon/1'
};
