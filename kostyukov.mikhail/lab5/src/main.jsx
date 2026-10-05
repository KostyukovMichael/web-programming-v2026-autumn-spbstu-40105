import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const booksData = [
  {
    id: 'author-1',
    name: 'Лев Толстой',
    type: 'author',
    typeLabel: 'Автор',
    children: [
      {
        id: 'pub-1-1',
        name: 'Эксмо',
        type: 'publisher',
        typeLabel: 'Издательство',
        children: [
          {
            id: 'genre-1-1-1',
            name: 'Роман',
            type: 'genre',
            typeLabel: 'Жанр',
            children: [
              { id: 'book-1-1-1-1', name: 'Война и мир', type: 'book', typeLabel: 'Книга' },
              { id: 'book-1-1-1-2', name: 'Анна Каренина', type: 'book', typeLabel: 'Книга' },
            ],
          },
        ],
      },
      {
        id: 'pub-1-2',
        name: 'АСТ',
        type: 'publisher',
        typeLabel: 'Издательство',
        children: [
          {
            id: 'genre-1-2-1',
            name: 'Повесть',
            type: 'genre',
            typeLabel: 'Жанр',
            children: [
              { id: 'book-1-2-1-1', name: 'Смерть Ивана Ильича', type: 'book', typeLabel: 'Книга' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'author-2',
    name: 'Фёдор Достоевский',
    type: 'author',
    typeLabel: 'Автор',
    children: [
      {
        id: 'pub-2-1',
        name: 'Азбука',
        type: 'publisher',
        typeLabel: 'Издательство',
        children: [
          {
            id: 'genre-2-1-1',
            name: 'Классическая проза',
            type: 'genre',
            typeLabel: 'Жанр',
            children: [
              { id: 'book-2-1-1-1', name: 'Преступление и наказание', type: 'book', typeLabel: 'Книга' },
              { id: 'book-2-1-1-2', name: 'Идиот', type: 'book', typeLabel: 'Книга' },
            ],
          },
        ],
      },
      {
        id: 'pub-2-2',
        name: 'Эксмо',
        type: 'publisher',
        typeLabel: 'Издательство',
        children: [
          {
            id: 'genre-2-2-1',
            name: 'Роман',
            type: 'genre',
            typeLabel: 'Жанр',
            children: [
              { id: 'book-2-2-1-1', name: 'Братья Карамазовы', type: 'book', typeLabel: 'Книга' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'author-3',
    name: 'Джордж Оруэлл',
    type: 'author',
    typeLabel: 'Автор',
    children: [
      {
        id: 'pub-3-1',
        name: 'АСТ',
        type: 'publisher',
        typeLabel: 'Издательство',
        children: [
          {
            id: 'genre-3-1-1',
            name: 'Антиутопия',
            type: 'genre',
            typeLabel: 'Жанр',
            children: [
              { id: 'book-3-1-1-1', name: '1984', type: 'book', typeLabel: 'Книга' },
              { id: 'book-3-1-1-2', name: 'Скотный двор', type: 'book', typeLabel: 'Книга' },
            ],
          },
        ],
      },
    ],
  },
];

function TreeNode({ item }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = Boolean(item.children && item.children.length > 0);

  return (
    <li
      className="tree-item"
      role="treeitem"
      aria-expanded={hasChildren ? isOpen : undefined}
      data-testid={hasChildren ? 'tree-node' : 'tree-leaf'}
    >
      {hasChildren ? (
        <button
          type="button"
          className="tree-node-button"
          data-testid="toggle-button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="tree-arrow">{isOpen ? '▼' : '►'}</span>
          <span className={`tree-badge tree-badge-${item.type}`}>{item.typeLabel}</span>
          <span className="tree-label">{item.name}</span>
        </button>
      ) : (
        <div className="tree-leaf-content">
          <span className="tree-bullet">•</span>
          <span className={`tree-badge tree-badge-${item.type}`}>{item.typeLabel}</span>
          <span className="tree-label">{item.name}</span>
        </div>
      )}

      {hasChildren && isOpen && (
        <ul className="tree-group" role="group">
          {item.children.map((child) => (
            <TreeNode key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function App() {
  return (
    <section className="catalog-card">
      <header className="catalog-header">
        <h1 className="catalog-title">Каталог книг</h1>
        <p className="catalog-description">
          Иерархический список: Автор → Издательство → Жанр → Книга
        </p>
      </header>

      <div className="catalog-tree-wrapper" data-testid="tree">
        <ul className="tree-root" role="tree">
          {booksData.map((author) => (
            <TreeNode key={author.id} item={author} />
          ))}
        </ul>
      </div>
    </section>
  );
}

const rootElement = document.querySelector('[data-testid="app"]');

if (!rootElement) {
  throw new Error('Корневой элемент приложения не найден.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
