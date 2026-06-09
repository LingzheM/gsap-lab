import styles from './ClarityStory.module.css';
import { steps } from './step';

export function StorySteps() {
  return (
    <div className={styles.textSection}>
      {steps.map((step) => (
        <div key={step.id} className={`${styles.step} step`}>
          <h1 className={styles.stepTitle}>{step.title}</h1>
          <p className={styles.stepBody}>
            {step.body.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </div>
      ))}
      <div className={styles.step} />
    </div>
  )
}