import PropTypes from 'prop-types';
import css from './list.module.scss';

const List = ({ contacts, onDeleteContact }) => (
  <ul className={css.list}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={css.item}>
        <p>
          <span>👤</span>{' '}
          {name}: {number}
        </p>
        <button
          type="button"
          onClick={() => onDeleteContact(id)}
          className={css.button}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

List.propTypes = {
    onDeleteContact: PropTypes.func,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
        })
    ),
};

export default List;
