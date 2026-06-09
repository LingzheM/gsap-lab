import styles from './ClarityStory.module.css';
import { steps } from './step';

export function StorySteps() {
  return (
    <div className={styles.textSection}>
      {steps.map((step) => (
        <div key={step.id} className={`${styles.step} step`}>
          <h1 className={styles.stepTitle}>{step.title}</h1>
        </div>
      ))}
    </div>
  )
}