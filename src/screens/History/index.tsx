import {
	Card,
	PageTitle,
	ReactTable
} from 'components'
import {useMemo} from 'react'
import {Column} from 'react-table'
import {useTypedSelector} from 'hooks'
import {useTranslation} from 'react-i18next'
import {IHistoryEntry} from 'interfaces/history.interface'


const Index = () => {
	const {t} = useTranslation()
	const {entries} = useTypedSelector((state) => state.history)

	const columns: Column<IHistoryEntry>[] = useMemo(() =>
			[
				{
					Header: t('№'),
					accessor: (_: IHistoryEntry, index: number) => index + 1,
					style: {
						width: '2.8rem',
						textAlign: 'center'
					}
				},
				{
					Header: t('Original command'),
					accessor: (row: IHistoryEntry) => row.originalCommand
				},
				{
					Header: t('Optimized command'),
					accessor: (row: IHistoryEntry) => row.optimizedCommand
				},
				{
					Header: t('Time'),
					accessor: (row: IHistoryEntry) => row.dateTime
				},
				{
					Header: t('Initial position'),
					accessor: (row: IHistoryEntry) => row.samplesBefore
				},
				{
					Header: t('Last position'),
					accessor: (row: IHistoryEntry) => row.samplesAfter
				}
			],
		[t]
	)


	return (
		<>
			<PageTitle title="Commands history"/>
			<Card>
				<ReactTable columns={columns} data={entries}/>
			</Card>
		</>
	)
}

export default Index
