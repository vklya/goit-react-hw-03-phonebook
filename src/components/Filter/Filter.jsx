import css from './filter.module.scss';

const Filter = ({ value, onChange }) => (
    <label>
        Find contacts by name {' '}
        <input type="text" value={value} onChange={onChange} className={css.filter} />
    </label>
)

export default Filter;