import { Router } from 'express';
import examRouter from '~/routes/level.routes';
import setbookRouter from '~/routes/setbook.routes';
import schemeofWorkRouter from '~/routes/schemeofwork.routes';
import pastPaperRouter from '~/routes/pastpaper.routes';
import lessonNoteRouter from '~/routes/lessonnote.routes';
import lessonPlanRouter from '~/routes/lessonplan.routes';
import otherDocumentRouter from '~/routes/otherdocument.routes';
import revisionBookRouter from '~/routes/revisionbook.routes';
import roomRouter from '~/routes/room.routes';
import levelRouter from '~/routes/level.routes';
import examTypeRouter from '~/routes/examtype.routes';
import subjectRouter from '~/routes/subject.routes';


const router = Router();

router.use('/exams',examRouter);
router.use('/set-books',setbookRouter);
router.use('/schemes-of-work',schemeofWorkRouter);
router.use('/past-papers',pastPaperRouter);
router.use('/lesson-notes',lessonNoteRouter);
router.use('/lesson-plans',lessonPlanRouter);
router.use('/other-documents',otherDocumentRouter);
router.use('/revision-books',revisionBookRouter);
router.use('/rooms',roomRouter);
router.use('/levels',levelRouter);
router.use('/exam-types',examTypeRouter);
router.use('/subjects',subjectRouter);

export default router;