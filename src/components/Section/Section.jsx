import css from './section.module.scss';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => (
    <section className={css.section}>
        <h2 className={css.title}>{title}</h2>
        {children}
    </section>
);
    
Section.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Section;