import toUninst from '../src';
import Parser from 'tree-sitter';
import JavaScript from 'tree-sitter-javascript';
import { expect } from 'chai';

describe('Parse JavaScript', () => {
  it('create an Uninst tree', () => {
    const parser = new Parser();
    parser.setLanguage(JavaScript);
    const tree = parser.parse(
      'const x = "Hello";\nconsole.log(x + " world!");'
    );
    const result = toUninst(tree);

    const expectedTree = {
      type: 'program',
      value: 'const x = "Hello";\nconsole.log(x + " world!");',
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 28, offset: 46 },
      },
      children: [
        {
          type: 'lexical_declaration',
          value: 'const x = "Hello";',
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 19, offset: 18 },
          },
          children: [
            {
              type: 'variable_declarator',
              value: 'x = "Hello"',
              position: {
                start: { line: 1, column: 7, offset: 6 },
                end: { line: 1, column: 18, offset: 17 },
              },
              children: [
                {
                  type: 'identifier',
                  value: 'x',
                  position: {
                    start: { line: 1, column: 7, offset: 6 },
                    end: { line: 1, column: 8, offset: 7 },
                  },
                  children: [],
                },
                {
                  type: 'string',
                  value: '"Hello"',
                  position: {
                    start: { line: 1, column: 11, offset: 10 },
                    end: { line: 1, column: 18, offset: 17 },
                  },
                  children: [],
                },
              ],
            },
          ],
        },
        {
          type: 'expression_statement',
          value: 'console.log(x + " world!");',
          position: {
            start: { line: 2, column: 1, offset: 19 },
            end: { line: 2, column: 28, offset: 46 },
          },
          children: [
            {
              type: 'call_expression',
              value: 'console.log(x + " world!")',
              position: {
                start: { line: 2, column: 1, offset: 19 },
                end: { line: 2, column: 27, offset: 45 },
              },
              children: [
                {
                  type: 'member_expression',
                  value: 'console.log',
                  position: {
                    start: { line: 2, column: 1, offset: 19 },
                    end: { line: 2, column: 12, offset: 30 },
                  },
                  children: [
                    {
                      type: 'identifier',
                      value: 'console',
                      position: {
                        start: { line: 2, column: 1, offset: 19 },
                        end: { line: 2, column: 8, offset: 26 },
                      },
                      children: [],
                    },
                    {
                      type: 'property_identifier',
                      value: 'log',
                      position: {
                        start: { line: 2, column: 9, offset: 27 },
                        end: { line: 2, column: 12, offset: 30 },
                      },
                      children: [],
                    },
                  ],
                },
                {
                  type: 'arguments',
                  value: '(x + " world!")',
                  position: {
                    start: { line: 2, column: 12, offset: 30 },
                    end: { line: 2, column: 27, offset: 45 },
                  },
                  children: [
                    {
                      type: 'binary_expression',
                      value: 'x + " world!"',
                      position: {
                        start: { line: 2, column: 13, offset: 31 },
                        end: { line: 2, column: 26, offset: 44 },
                      },
                      children: [
                        {
                          type: 'identifier',
                          value: 'x',
                          position: {
                            start: { line: 2, column: 13, offset: 31 },
                            end: { line: 2, column: 14, offset: 32 },
                          },
                          children: [],
                        },
                        {
                          type: 'string',
                          value: '" world!"',
                          position: {
                            start: { line: 2, column: 17, offset: 35 },
                            end: { line: 2, column: 26, offset: 44 },
                          },
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    expect(result).to.eql(expectedTree);
  });
});
